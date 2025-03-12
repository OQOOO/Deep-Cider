using Microsoft.AspNetCore.Mvc;
using OO_CoreServer.DTOs;
using OO_CoreServer.Services;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OO_CoreServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private LLMApiClientService _clientService;

        public MainController(LLMApiClientService clientService)
        {
            _clientService = clientService;
        }

        // GET: api/Main
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("Chat/{request}")]
        public async Task<string> Test(string request)
        {
            string res = await _clientService.PostToLLMServer(request);

            return res;
        }

        [HttpPost("chat/" + nameof(TypeA))]
        public async Task<string> TypeA([FromBody] MessageDTO dto)
        {
            string response = await _clientService.PostToLLMServer(dto.Message);

            return response;
        }
    }
}
