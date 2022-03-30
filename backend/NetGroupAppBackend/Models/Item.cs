using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int? SerialNumber { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string? Comments { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }

        public int? StorageId { get; set; }
        public virtual Storage? Storage { get; set; }
    }

    public class ItemVM
    {
        public string Title { get; set; } = string.Empty;
        public int? SerialNumber { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; } = string.Empty;
        public IFormFile ImagePath { get; set; }
        public string? Comments { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }

        //public int? StorageId { get; set; }
        //public virtual Storage? Storage { get; set; }
    }
}
