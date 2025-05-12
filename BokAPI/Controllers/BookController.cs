using Microsoft.AspNetCore.Mvc;
using BokAPI.Models;
using BokAPI.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace BokAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookController(AppDbContext context)
        {
            _context = context;
        }

        // Hjälpmetod för att hämta UserId och logga ut vad som finns
        // Hjälp av chatgpt för att sätta upp det
        private string? GetUserId()
        {
            var nameId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var sub = User.FindFirstValue("sub");

            Console.WriteLine($"[DEBUG] ClaimTypes.NameIdentifier: {nameId}");
            Console.WriteLine($"[DEBUG] sub: {sub}");

            return nameId ?? sub;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            var userId = GetUserId();
            if (userId == null)
            {
                Console.WriteLine("[ERROR] Ingen användar-ID hittad i token.");
                return Unauthorized();
            }

            var books = _context.Books.Where(b => b.UserId == userId).ToList();
            Console.WriteLine($"[INFO] Hittade {books.Count} böcker för användare {userId}");

            return books;
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBookById(int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                Console.WriteLine($"[WARN] Ingen bok med id {id} hittades.");
                return NotFound();
            }
            return book;
        }

        [HttpGet("mybooks")]
        public ActionResult<IEnumerable<Book>> GetMyBooks()
        {
            var userId = GetUserId();
            if (userId == null)
            {
                Console.WriteLine("[ERROR] Ingen användar-ID hittad i token.");
                return Unauthorized();
            }

            Console.WriteLine($"[INFO] Hittat användar-ID: {userId}");

            var books = _context.Books.Where(b => b.UserId == userId).ToList();
            Console.WriteLine($"[INFO] Hittade {books.Count} böcker för användare {userId}");

            return books;
        }

        [HttpPost]
        public ActionResult<Book> AddBook(Book book)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                Console.WriteLine("[ERROR] Ingen användar-ID hittad vid skapande.");
                return Unauthorized();
            }

            book.UserId = userId;

            _context.Books.Add(book);
            _context.SaveChanges();

            Console.WriteLine($"[INFO] Bok skapad med id {book.Id} för användare {userId}");

            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }

        // Hade först tänkt ha möjlighet för användaren att skapa egna böcker men det blev ""kladdigt"
        //på sidan så därför implementeras inte det i frontenden

        [HttpPut("{id}")]
        public ActionResult UpdateBook(int id, Book updatedBook)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                Console.WriteLine("[ERROR] Ingen användar-ID hittad vid uppdatering.");
                return Unauthorized();
            }

            var book = _context.Books.Find(id);
            if (book == null)
            {
                Console.WriteLine($"[WARN] Ingen bok med id {id} hittades för uppdatering.");
                return NotFound();
            }

            if (book.UserId != userId)
            {
                Console.WriteLine($"[FORBID] Användare {userId} försökte uppdatera bok som inte tillhör dem.");
                return Forbid();
            }

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Description = updatedBook.Description;
            book.Genre = updatedBook.Genre;

            _context.SaveChanges();

            Console.WriteLine($"[INFO] Bok med id {id} uppdaterades.");

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteBook(int id)
        {
            var userId = GetUserId();
            if (userId == null)
            {
                Console.WriteLine("[ERROR] Ingen användar-ID hittad vid borttagning.");
                return Unauthorized();
            }

            var book = _context.Books.Find(id);
            if (book == null)
            {
                Console.WriteLine($"[WARN] Ingen bok med id {id} hittades för borttagning.");
                return NotFound();
            }

            if (book.UserId != userId)
            {
                Console.WriteLine($"[FORBID] Användare {userId} försökte ta bort bok som inte tillhör dem.");
                return Forbid();
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            Console.WriteLine($"[INFO] Bok med id {id} togs bort.");

            return NoContent();
        }
    }
}


