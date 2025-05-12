using System.ComponentModel.DataAnnotations;


// Hantera uppdatering/redigering av användarkonto

namespace UserAPI.Models
{
    public class UpdateUserModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }


    }
}
