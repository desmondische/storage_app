namespace NetGroupAppBackend.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int? SerialNumber { get; set; }
        public string Image { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }
}
