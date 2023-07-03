const getPrettyPropName = (name: string) => {
  return name.replace(/([A-Z])/g, " $1").trim();
};

export default getPrettyPropName;
