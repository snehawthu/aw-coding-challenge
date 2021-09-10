using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using CodingChallenge.DataAccess.Interfaces;
using CodingChallenge.DataAccess.Models;
using CodingChallenge.Utilities;

namespace CodingChallenge.DataAccess
{
    public class LibraryService : ILibraryService
    {
        public LibraryService() { }

        private IEnumerable<Movie> GetMovies()
        {
            return _movies ?? (_movies = ConfigurationManager.AppSettings["LibraryPath"].FromFileInExecutingDirectory().DeserializeFromXml<Library>().Movies);
        }
        private IEnumerable<Movie> _movies { get; set; }

        public int SearchMoviesCount(string title)
        {
            return SearchMovies(title).Count();
        }

        public IEnumerable<Movie> SearchMovies(string title, int? skip = null, int? take = null,
            string sortColumn = null, SortDirection sortDirection = SortDirection.Ascending)
        {
            var movies = GetMovies().Where(s => s.Title.Contains(title));
            if (sortColumn == "ID")
            {
                movies = sortDirection == SortDirection.Ascending ? movies.OrderBy(m => m.ID) : movies.OrderByDescending(m => m.ID);
            }
            else if (sortColumn == "Title")
            {
                movies = sortDirection == SortDirection.Ascending ?
                                            movies.OrderBy(m => IgnoreArticle(m.Title)) :
                                            movies.OrderByDescending(m => IgnoreArticle(m.Title));
            }
            else if (sortColumn == "Rating")
            {
                movies = sortDirection == SortDirection.Ascending ? movies.OrderBy(m => m.Rating) : movies.OrderByDescending(m => m.Rating);
            }
            else if (sortColumn == "Year")
            {
                movies = sortDirection == SortDirection.Ascending ? movies.OrderBy(m => m.Year) : movies.OrderByDescending(m => m.Year);
            }
            if (skip.HasValue && take.HasValue)
            {
                movies = movies.Skip(skip.Value).Take(take.Value);
            }
            return new HashSet<Movie>(movies).ToList();
        }

        private string IgnoreArticle(string title)
        {
            var articles = new string[] { "the", "an", "a" };

            foreach (var article in articles)
                if (title.ToLower().StartsWith(article))
                    return title.Substring(article.Length).Trim();

            return title;
        }
    }
}
