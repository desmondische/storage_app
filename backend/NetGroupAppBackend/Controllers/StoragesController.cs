#nullable disable
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetGroupAppBackend.Data;
using NetGroupAppBackend.Filter;
using NetGroupAppBackend.Models;
using NetGroupAppBackend.Models.Data.DTOs;
using NetGroupAppBackend.Wrappers;
using System.Linq;
using System.Net;
using System.Security.Claims;

namespace NetGroupAppBackend.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StoragesController : ControllerBase
    {
        private readonly DataContext _context;

        public StoragesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Storages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Storage>>> GetStorages([FromQuery] PaginationFilter filter)
        {
            var storages = _context.Storages;

            var validFilter = new PaginationFilter(filter.Page, filter.PageSize);
            var pagedData = await storages
                            .Skip((validFilter.Page - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .Include(c => c.Items)
                            .ToListAsync();

            var totalRecords = await storages.CountAsync();

            return Ok(new PagedResponse<List<Storage>>(pagedData, validFilter.Page, validFilter.PageSize, totalRecords));
        }

        // GET: api/Storages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Storage>> GetStorage(int id)
        {
            var storage = await _context.Storages
                                //.Where(c => c.Id == id && c.UserId == GetUserId())
                                .Where(c => c.Id == id)
                                .Include(c => c.Items)
                                .FirstOrDefaultAsync();

            return storage == null ? NotFound() : storage;
        }

        // PUT: api/Storages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStorage(int id, Storage storage)
        {
            if (id != storage.Id)
            {
                return BadRequest();
            }

            //storage.UserId = GetUserId();
            _context.Entry(storage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StorageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Storages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Storage>> PostStorage(Storage storage)
        {
            //storage.UserId = GetUserId();
            _context.Storages.Add(storage);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStorage", new { id = storage.Id }, storage);
        }

        // DELETE: api/Storages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStorage(int id, [FromQuery] PaginationFilter filter)
        {
            var storages = _context.Storages;
            var storage = await storages.FindAsync(id);
            if (storage == null)
            {
                return NotFound();
            }

            _context.Storages.Remove(storage);
            await _context.SaveChangesAsync();

            var validFilter = new PaginationFilter(filter.Page, filter.PageSize);
            var pagedData = await storages
                            .Skip((validFilter.Page - 1) * validFilter.PageSize)
                            .Take(validFilter.PageSize)
                            .Include(c => c.Items)
                            .ToListAsync();

            var totalRecords = await storages.CountAsync();

            return Ok(new PagedResponse<List<Storage>>(pagedData, validFilter.Page, validFilter.PageSize, totalRecords));
        }

        private bool StorageExists(int id)
        {
            return _context.Storages.Any(e => e.Id == id);
        }

        private string GetUserId()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity!.FindFirst(ClaimTypes.Name)!.Value;
            return userId;
        }
    }
}
