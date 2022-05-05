using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models.Data.DTOs
{
    public class StorageDTO
    {
        public int Id { get; set; }
        [JsonIgnore]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public string StorageSpace { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public int TotalCount { get; set; }

        public virtual ICollection<Item>? Items { get; set; }
    }
}
