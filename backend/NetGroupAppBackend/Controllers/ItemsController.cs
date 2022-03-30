#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetGroupAppBackend.Data;
using NetGroupAppBackend.Models;
using System.Net.Http.Headers;

namespace NetGroupAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly DataContext _context;
        public IWebHostEnvironment _environment;

        public ItemsController(DataContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _environment = hostingEnvironment;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var item = await _context.Items
                                .Include(c => c.Storage)
                                .ToListAsync();

            return item;
        }

        //[HttpGet("with-storage-spaces")]
        //public async Task<List<ItemVM>> GetItemsWithStorageSpaces()
        //{
        //    var item = await _context.Items.Select(item => new ItemVM()
        //    {
        //        Title = item.Title,
        //        Storage = new StorageVM()
        //        {
        //            StorageSpace = item.Storage.StorageSpace
        //        }
        //    }).ToListAsync();

        //    return item;
        //}

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null) return NotFound();

            return item;
        }

        // PUT: api/Items/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.Id) return BadRequest();

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
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        // POST: api/Items
        //[HttpPost]
        //public async Task<ActionResult<ItemVM>> PostItem([FromForm] ItemVM item)
        //{
        //    var files = HttpContext.Request.Form.Files;
        //    string fileName = null;

        //    if (files != null && files.Count == 1)
        //    {
        //        foreach (var file in files)
        //        {
        //            FileInfo fileInfo = new(file.FileName);
        //            fileName = "image_" + DateTime.Now.TimeOfDay.Milliseconds + fileInfo.Extension;
        //            var path = Path.Combine("", _environment.ContentRootPath + "\\Images\\" + fileName);
        //            using var stream = new FileStream(path, FileMode.Create);
        //            file.CopyTo(stream);
        //        }
        //    }

        //    string fileName = null;
        //    if (item.ImagePath != null)
        //    {
        //        var uploadDir = Path.Combine("", _environment.ContentRootPath + "\\Images\\");
        //        fileName = Path.Combine("image_" + DateTime.Now.TimeOfDay.Milliseconds + item.ImagePath.FileName);
        //        var filePath = Path.Combine(uploadDir, fileName);
        //        using var fileStream = new FileStream(filePath, FileMode.Create);
        //        item.ImagePath.CopyTo(fileStream);
        //    }

        //    Item _item = new()
        //    {
        //        Title = item.Title,
        //        SerialNumber = item.SerialNumber,
        //        Quantity = item.Quantity,
        //        Description = item.Description,
        //        ImagePath = fileName
        //    };
        //    _context.Items.Add(_item);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetItem", new { id = _item.Id }, item);
        //}

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
    }
}
