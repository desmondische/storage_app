using System.Text.Json.Serialization;

namespace NetGroupAppBackend.Models
{
    public class StorageItem
    {
        public int ItemId { get; set; }
        public int StorageId { get; set; }

        [JsonIgnore]
        public virtual Item? Item { get; set; }
        [JsonIgnore]
        public virtual Storage? Storage { get; set; }

    }
}
