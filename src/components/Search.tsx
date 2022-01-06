import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import Colors from '../enums/Colors';
import Movie from '../models/Movie';
import { getMovies } from '../services/MovieService';
import DisplayError from './DisplayError';
import ListItemMovie from './ListItemMovie';

type SearchParams = {
  navigation: any
}

const Search = ({ navigation }: SearchParams) => {
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [reseach, setResearch] = useState<string>('');


  const searchMovie = async () => {
    Keyboard.dismiss();
    const res = await getMovies(reseach, 0);
    setMovies(res)
  }

  const dontResearch = async () => {
    setResearch('')
    const res = await getMovies('', 0);
    setMovies(res)
  }

  const next = async () => {
    if (movies.length < 40) {
      const res = await getMovies(reseach, 20);
      setMovies([...movies, ...res]);
    }
  }

  const navigateToMovieDetails = (id: number) => {
    navigation.navigate("ViewMovie", { id });
  };

  useEffect(() => {
    (async () => {
        setMovies(await getMovies(''));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Nom du film'
          value={reseach}
          onSubmitEditing={searchMovie}
          onChangeText={(text) => setResearch(text.trim())}
        />
        <Button
          title='Annuler'
          onPress={dontResearch}
        />
        <Button
          title='Rechercher'
          color={Colors.mainGreen}
          onPress={searchMovie}
        />
      </View>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les films' />) :
          (<FlatList
            data={movies}
            renderItem={({ item }: {item: Movie}) => (
              <ListItemMovie
                movie={item}
                onClick={() => navigateToMovieDetails(item.id)}
              />
            )}
            onEndReached={next}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
          />)
      }
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 50,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
});