using System.Net.Http;
using System.Text.Json;
using System.Text;

namespace OO_CoreServer.Services
{
    public class LLMApiClientService
    {
        private readonly HttpClient _httpClient;
        public LLMApiClientService(HttpClient httpClient) 
        {
            _httpClient = httpClient;
        }

        public async Task<string> PostToLLMServer(string request)
        {
            string prompt = $"""
                header
                =====
                {request}
                =====
                tail
                """;

            var payload = new { prompt = prompt };
            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("http://host.docker.internal:5000/generate", content);
            var result = await response.Content.ReadAsStringAsync();

            return result;
        }
    }
}
