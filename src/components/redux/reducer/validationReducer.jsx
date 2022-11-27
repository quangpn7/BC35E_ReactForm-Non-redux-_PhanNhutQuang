// const stateDefault = { id: "", fullName: "", phone: "", email: "" };

// export const inputValidationReducer = (state = stateDefault, action) => {
//   let InputError = { ...state };
//   switch (action.type) {
//     case "GET_INPUT": {
//       let newInputError = { ...InputError };
//       let messError = "";
//       if (action.payload.trim() === "") {
//         messError = "*Không để trống";
//       } else {
//         if (action.inputType === "phone") {
//           let regexNumber =
//             /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
//           if (!regexNumber.test(action.payload)) {
//             messError = "*Số điện thoại không hợp lệ";
//           }
//         } else if (action.inputType === "fullName") {
//           let regexName = new RegExp(
//             /^[A-Za-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
//           );
//           if (!regexName.test(action.payload)) {
//             messError =
//               "*Tên phải viết in chữ cái đầu, không có số, không có ký tự đặc biệt";
//           }
//         } else if (action.inputType === "email") {
//           let regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
//           if (!regexEmail.test(action.payload)) {
//             messError = "*Email không hợp lệ";
//           }
//         }
//         // } else if (type === "id") {
//         //   for (let existedId of this.props.existedId) {
//         //     if (value === existedId) {
//         //       messError = pureInputName + " đã tồn tại";
//         //     }
//         //   }
//         //   let regexId = new RegExp(/^[a-zA-Z0-9_.-]*$/);
//         //   if (!regexId.test(value)) {
//         //     messError = pureInputName + " không có ký tự đặc biệt";
//         //   }
//         // }
//       }

//       newInputError[action.inputType] = messError;

//       return newInputError;
//     }

//     default:
//       return InputError;
//   }
// };
