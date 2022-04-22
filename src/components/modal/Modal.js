import { useState, useEffect } from "react";
import PokemonDataView from "./DataView";
import PokemonErrorView from "./ErrorView";
import PokemonPendingView from "./PendingView";
import pokemonAPI from "../../services/pokemon-api";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  useEffect(() => {
    // первый рендер pokemonName это пустая строка, не далаем фетч
    if (!pokemonName) {
      return;
    }
    setStatus(Status.PENDING);

    pokemonAPI
      .fetchPokemon(pokemonName)
      .then((pokemon) => {
        // порядок важен, сначала кладем данные потом статус!!!!!
        setPokemon(pokemon);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [pokemonName]);

  if (status === Status.IDLE) {
    return <div>Введите имя покемона.</div>;
  }

  if (status === Status.PENDING) {
    return <PokemonPendingView pokemonName={pokemonName} />;
  }

  if (status === Status.REJECTED) {
    return <PokemonErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

// import { Component } from "react";
// import PokemonDataView from "./DataView";
// import PokemonErrorView from "./ErrorView";
// import PokemonPendingView from "./PendingView";
// import pokemonAPI from "../../services/pokemon-api";

// const Status = {
//   IDLE: "idle",
//   PENDING: "pending",
//   RESOLVED: "resolved",
//   REJECTED: "rejected",
// };

// export default class PokemonInfo extends Component {
//   state = {
//     pokemon: null,
//     error: null,
//     status: Status.IDLE,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       this.setState({ status: Status.PENDING });

//       pokemonAPI
//         .fetchPokemon(nextName)
//         .then((pokemon) => this.setState({ pokemon, status: Status.RESOLVED }))
//         .catch((error) => this.setState({ error, status: Status.REJECTED }));
//     }
//   }

//   render() {
//     const { pokemon, error, status } = this.state;
//     const { pokemonName } = this.props;

//     if (status === "idle") {
//       return <div>Введите имя покемона.</div>;
//     }

//     if (status === "pending") {
//       return <PokemonPendingView pokemonName={pokemonName} />;
//     }

//     if (status === "rejected") {
//       return <PokemonErrorView message={error.message} />;
//     }

//     if (status === "resolved") {
//       return <PokemonDataView pokemon={pokemon} />;
//     }
//   }
// }
