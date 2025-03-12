using OO_CoreServer.Services;

var builder = WebApplication.CreateBuilder(args);

// CORS 정책 정의
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()  // 모든 오리진을 허용
            .AllowAnyMethod()     // 모든 HTTP 메서드 허용
            .AllowAnyHeader();    // 모든 헤더 허용
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

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

// 이 설정은 배포 환경에서도 Swagger UI를 활성화
app.UseSwagger();
app.UseSwaggerUI();

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
