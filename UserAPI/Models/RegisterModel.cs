using System.ComponentModel.DataAnnotations;


// Modell för att registrera användare


namespace UserAPI.Models
{
    public class RegisterModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "Lösenordet måste vara minst 6 tecken långt.")]
        public string Password { get; set; }
    }
}

