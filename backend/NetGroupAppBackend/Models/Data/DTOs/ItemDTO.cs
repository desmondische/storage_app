using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models.Data.DTOs
{
    public class ItemDTO
    {
        public string Title { get; set; } = string.Empty;
        [JsonIgnore]
        public string UserId { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string? Comments { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }

        public virtual StorageDTO? Storage { get; set; }
    }
}
