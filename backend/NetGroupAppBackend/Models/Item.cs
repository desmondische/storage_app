using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int? SerialNumber { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }

        public int? StorageId { get; set; }

        [JsonIgnore]
        public virtual Storage? Storage { get; set; }
    }
}
