interface ICheckingValid {
  [key: string]: string;
}

export const checkingValidation = (data: ICheckingValid) => {
  let err = "";
  const multiError = (key: string) => {
    err = "Please input " + key
  }
  const singleError = (key: string) => {
    err = err + "\n" + "Please input " + key
  }
  Object.keys(data).forEach(function (key, index) {
    if (data[key]) return null
    return (
      (err === "")
        ? multiError(key)
        : singleError(key)
    )
  })
  console.log(err);
  return err;
}