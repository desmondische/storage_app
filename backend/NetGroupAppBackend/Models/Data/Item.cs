using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models
{
    public class Item
    {
        public int Id { get; set; }
        [JsonIgnore]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public string Title { get; set; } = string.Empty;
        [MaxLength(12)]
        public string SerialNumber { get; set; } = string.Empty;
        [Required]
        public int Quantity { get; set; }
        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string ImagePath { get; set; } = string.Empty;
        [MaxLength(50)]
        public string? Comments { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }

        [Required]
        public int StorageId { get; set; }
        [JsonIgnore]
        public virtual Storage? Storage { get; set; }
    }
}
