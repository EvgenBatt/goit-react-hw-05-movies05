import { Container } from '@mui/material';
import { Loader, MoviesList, SearchForm } from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchMovie } from 'service/api';
import { Section } from 'styles/Common.styled';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      fetchData(queryParam);
    }
  }, [searchParams]);

  const fetchData = async queryParam => {
    setIsLoading(true);

    try {
      const data = await getSearchMovie(queryParam);
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = queryParam => {
    setSearchParams({ query: queryParam });
  };

  return (
    <main>
      <Section>
        <Container>
          <SearchForm onSubmit={handleFormSubmit} />
          {movies !== null ? (
            movies.length > 0 ? (
              <MoviesList movies={movies} />
            ) : (
              <p>No movies found</p>
            )
          ) : (
            isLoading && <Loader />
          )}
          {isLoading && <Loader />}
          {error && <p>Oops... Something went wrong...</p>}
        </Container>
      </Section>
    </main>
  );
};

export default Movies;
