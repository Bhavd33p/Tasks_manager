using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalDevPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); 
    });
});

var app = builder.Build();

app.UseCors("LocalDevPolicy");

var store = new ConcurrentDictionary<Guid, TaskItem>();

app.MapGet("/api/tasks", () => Results.Ok(store.Values));

app.MapPost("/api/tasks", (TaskCreate dto) =>
{
    if (string.IsNullOrWhiteSpace(dto.Description)) return Results.BadRequest();
    var t = new TaskItem { Id = Guid.NewGuid(), Description = dto.Description.Trim(), IsCompleted = false };
    store[t.Id] = t;
    return Results.Created($"/api/tasks/{t.Id}", t);
});

app.MapPut("/api/tasks/{id}", (Guid id, TaskUpdate dto) =>
{
    if (!store.TryGetValue(id, out var existing)) return Results.NotFound();
    existing.Description = dto.Description ?? existing.Description;
    if (dto.IsCompleted.HasValue) existing.IsCompleted = dto.IsCompleted.Value;
    store[id] = existing;
    return Results.Ok(existing);
});

app.MapDelete("/api/tasks/{id}", (Guid id) =>
    store.TryRemove(id, out _) ? Results.NoContent() : Results.NotFound()
);

app.Run();

public class TaskItem
{
    public Guid Id { get; set; }
    public string Description { get; set; } = "";
    public bool IsCompleted { get; set; }
}

public record TaskCreate(string Description);
public record TaskUpdate(string? Description, bool? IsCompleted);
