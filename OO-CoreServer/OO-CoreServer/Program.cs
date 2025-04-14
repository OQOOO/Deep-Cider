using Microsoft.EntityFrameworkCore;
using OO_CoreServer.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS ��å ����
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()  // ��� �������� ���
            .AllowAnyMethod()     // ��� HTTP �޼��� ���
            .AllowAnyHeader();    // ��� ��� ���
    });
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

// custom services
builder.Services.AddTransient<LLMApiClientService>();
builder.Services.AddTransient<ImageApiClientService>();
builder.Services.AddTransient<OpenApiClient>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

// �� ������ ���� ȯ�濡���� Swagger UI�� Ȱ��ȭ
app.UseSwagger();
app.UseSwaggerUI();

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
