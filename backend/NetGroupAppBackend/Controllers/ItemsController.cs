#nullable disable
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetGroupAppBackend.Data;
using NetGroupAppBackend.Models;
using NetGroupAppBackend.Models.DTOs;
using System.Security.Claims;

namespace NetGroupAppBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly DataContext _context;
        public IWebHostEnvironment _environment;

        public ItemsController(
            DataContext context, 
            IWebHostEnvironment hostingEnvironment
            )
        {
            _context = context;
            _environment = hostingEnvironment;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemDTO>>> GetItems()
        {
            var item = await _context.Items
                                .Where(x => x.UserId == GetUserId())
                                .Select(n => new ItemDTO()
                                {
                                    Title = n.Title,
                                    SerialNumber = n.SerialNumber,
                                    Quantity = n.Quantity,
                                    Description = n.Description,
                                    ImagePath = n.ImagePath,
                                    Comments = n.Comments,
                                    CreatedDate = n.CreatedDate,
                                    Storage = new StorageDTO()
                                    {
                                        StorageSpace = n.Storage.StorageSpace
                                    }
                                })
                                .ToListAsync();

            return item;
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items
                                    .Where(c => c.Id == id && c.UserId == GetUserId())
                                    .Include(c => c.Storage)
                                    .FirstOrDefaultAsync();

            return item == null ? NotFound() : item;
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.Id) return BadRequest();

            item.UserId = GetUserId();
            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id)) return NotFound();
                else throw;

            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {

            item.UserId = GetUserId();
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null) return NotFound();

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
        private string GetUserId()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity!.FindFirst(ClaimTypes.Name)!.Value;
            return userId;
        }
    }
}
