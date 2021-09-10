using CodingChallenge.DataAccess.Interfaces;
using System.Web.Http;

namespace CodingChallenge.UI.Controllers
{
    [RoutePrefix("api/movies")]
    public class MoviesApiController : ApiController
    {
        public ILibraryService LibraryService { get; private set; }

        public MoviesApiController() { }

        public MoviesApiController(ILibraryService libraryService)
        {
            LibraryService = libraryService;
        }

        [HttpGet]
        [Route("getMoviesList")]
        public IHttpActionResult GetAllMovies()
        {
            return Ok(LibraryService.SearchMovies(""));
        }

        [HttpGet]
        [Route("searchbyTitle/{title}")]
        public IHttpActionResult SearchByTitle(string title = "")
        {
            return Ok(LibraryService.SearchMovies(title));
        }
    }
}