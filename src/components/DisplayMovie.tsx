import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { connect } from "react-redux";
import Colors from "../enums/Colors";
import MovieDetails from "../models/MovieDetails";
import { getMovie } from "../services/MovieService";
import DisplayError from "./DisplayError";


const DisplayMovie = ({route, saveMovie, dispatch}: {route: any, saveMovie: any, dispatch: any}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<null | MovieDetails>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let movie = await getMovie(route.params.id);
      if(movie === null || movie === undefined)
      {
        setIsError(true);
      } else {
        setMovie(movie as MovieDetails);
      }
      setIsLoading(false);
    })();
  }, []);

  const saveMovieF = async () => {
    const action = { type: 'SAVE_MOVIE', value: route.params.saveMovie };
    dispatch(action);

  }

  const unsaveMovieF = async () => {
    const action = { type: 'UNSAVE_MOVIE', value: route.params.saveMovie };
    dispatch(action);
  }

  const displaySaveMovie = () => {
    if (saveMovie.findIndex((i: any) => i === route.params.restaurantID) !== -1) {
      // Le restaurant est sauvegardé
      return (
        <Button
          title='Retirer des favoris'
          color={Colors.mainGreen}
          onPress={unsaveMovieF}
        />
      );
    }
    // Le restaurant n'est pas sauvegardé
    return (
      <Button
        title='Ajouter aux favoris'
        color={Colors.mainGreen}
        onPress={saveMovieF}
      />
    );
  }

  return (
      isLoading ? <></> : (isError ? <DisplayError message="Film non présent dans les helpers" /> : (
        <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {movie?.title}
          </Text>
          {//displaySaveMovie()
          }
        </View>
        <View style={{marginBottom:10}}>
          <Text>Release : {movie?.release_date}</Text>
          <Text>Genre : {movie?.genres.map((value) => {
            return value.name + " "
          })}</Text>
          <Text>Runtime : {movie?.runtime}</Text>
        </View>
        <View style={{marginBottom:10}}>
          <Text>Cast :</Text>
          <Text>{movie?.cast.map((value) => {
            return value + " "
          })}</Text>
        </View>
        <View>
          <Text>Overview :</Text>
          <Text>{movie?.overview}</Text>
        </View>
      </View>
      ))
  )
}

const mapStateToProps = (state: any) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

//export default connect(mapStateToProps)(DisplayMovie);
export default DisplayMovie;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});