const greetings = () => {
  const date = new Date();
  const hours = date.getHours();

  let greeting = "Good morning";
  if (hours < 12) {
    greeting = "Good afternoon";
  } else if (hours < 18) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return greeting;
};

export default greetings;
