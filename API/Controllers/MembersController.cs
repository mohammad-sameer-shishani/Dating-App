using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [Authorize]
        //localhost:5000/api/members
    public class MembersController(AppDBContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var members = await context.Users.ToListAsync();
            return members;
        }
        
        [HttpGet("{id}")]   //localhost:5000/api/members/{id}
        public async Task<ActionResult<AppUser>> GetMemberById(string id)
        {
            var member = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (member == null) return NotFound();
            return member;
        }
    }
}
