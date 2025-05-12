using System.ComponentModel.DataAnnotations;


// Modell för att ändra lösenord

namespace UserAPI.Models
{
    public class ChangePasswordModel
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }
    }
}
