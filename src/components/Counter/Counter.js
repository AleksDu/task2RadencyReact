// хук useReducer
import { useReducer } from "react";
import styles from "./Counter.module.css";

function countReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + action.payload };

    case "decrement":
      return { ...state, count: state.count - action.payload };

    default:
      throw new Error(`Unsuported action type ${action.type}`);
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(countReducer, {
    count: 0,
  });

  return (
    <div className={styles.container}>
      <p className={styles.value}>{state.count}</p>
      <button
        className={styles.btn}
        type="button"
        onClick={() => dispatch({ type: "increment", payload: 1 })}
      >
        Увеличить
      </button>

      <button
        className={styles.btn}
        type="button"
        onClick={() => dispatch({ type: "decrement", payload: 1 })}
      >
        Уменьшить
      </button>
    </div>
  );
}
// // хуки useState, useEffect
// // import React, { Component } from "react";
// import { useState, useEffect } from "react/cjs/react.development";
// import styles from "./Counter.module.css";

// export default function Counter() {
//   const [counterA, setCounterA] = useState(0);
//   const [counterB, setCounterB] = useState(0);

//   const handleCounterAIncrement = () => {
//     setCounterA((state) => state + 1);
//   };

//   const handleCounterBIncrement = () => {
//     setCounterB((state) => state + 1);
//   };
//   useEffect(() => {
//     const totalClicks = counterA + counterB;
//     document.title = `Всего кликнули ${totalClicks} раз`;
//   }, [counterA, counterB]);
//   return (
//     <>
//       <button
//         className={styles.btn}
//         type="button"
//         onClick={handleCounterAIncrement}
//       >
//         Кликнули counterA {counterA} раз
//       </button>

//       <button
//         className={styles.btn}
//         type="button"
//         onClick={handleCounterBIncrement}
//       >
//         Кликнули counterB {counterB} раз
//       </button>
//     </>
//   );
// }
///////////////////////////////////////////////////////////////////
// class OldCounter extends Component {
//   state = {
//     counterA: 0,
//     counterB: 0,
//   };

//   handleCounterAIncrement = () => {
//     this.setState(({ counterA }) => ({ counterA: counterA + 1 }));
//   };

//   handleCounterBIncrement = () => {
//     this.setState(({ counterB }) => ({ counterB: counterB + 1 }));
//   };

//   componentDidMount() {
//     const { counterA, counterB } = this.state;
//     const totalClicks = counterA + counterB;

//     document.title = `Всего кликнули ${totalClicks} раз`;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { counterA, counterB } = this.state;

//     if (prevState.counterA !== counterA || prevState.counterB !== counterB) {
//       const totalClicks = counterA + counterB;

//       document.title = `Всего кликнули ${totalClicks} раз`;
//     }
//   }

//   render() {
//     return (
//       <>
//         <button
//           className={styles.btn}
//           type="button"
//           onClick={this.handleCounterAIncrement}
//         >
//           Кликнули counterA {this.state.counterA} раз
//         </button>

//         <button
//           className={styles.btn}
//           type="button"
//           onClick={this.handleCounterBIncrement}
//         >
//           Кликнули counterB {this.state.counterB} раз
//         </button>
//       </>
//     );
//   }
// }
