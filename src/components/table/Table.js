import useLocalStorage from "../../hooks/useLocalStorage";
import s from "./signUpForm.module.css";

export default function SignUpForm() {
  const [email, setEmail] = useLocalStorage("email", "");

  const [password, setPassword] = useLocalStorage("password", "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        return;
    }
  };

  return (
    <form className={s.form} autoComplete="off">
      <label className={s.label}>
        <span>Почта</span>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
      </label>

      <label className={s.label}>
        <span>Пароль</span>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
      </label>
    </form>
  );
}

// class OldSignUpForm extends Component {
//   state = {
//     email: "",
//     password: "",
//   };

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <form className={s.form} autoComplete="off">
//         <label className={s.label}>
//           <span>Почта</span>
//           <input
//             type="email"
//             name="email"
//             onChange={this.handleChange}
//             value={this.state.email}
//           />
//         </label>
//         <label className={s.label}>
//           <span>Пароль</span>
//           <input
//             type="password"
//             name="password"
//             onChange={this.handleChange}
//             value={this.state.password}
//           />
//         </label>
//       </form>
//     );
//   }
// }
