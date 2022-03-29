using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models
{
    public class Storage
    {
        public int Id { get; set; }
        public string StorageSpace { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }

        public virtual ICollection<Item>? Items { get; set; }
    }
}
