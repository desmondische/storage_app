using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models
{
    public class Storage
    {
        public int Id { get; set; }
        [JsonIgnore]
        public string UserId { get; set; } = string.Empty;
        [Required]
        public string StorageSpace { get; set; } = null!;
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<Item>? Items { get; set; }
    }
}
