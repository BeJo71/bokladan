namespace BokAPI.Models

    //Modell för att spara böcker
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        
        public string UserId { get; set; } = string.Empty;

        public int? CoverId { get; set; } 
        public int? PublishYear { get; set; }

    }
}
