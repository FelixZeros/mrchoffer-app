import { useState, useContext } from "react";
import RegisterContext from "../../../context/Register/RegisterContext";

const useRegisterForm = (navigation) => {
  const [identification, setIdentification] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [numberPropertyCard, setNumberPropertyCard] = useState("");
  const [typeVehicle, setTypeVehicle] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [cc, setCc] = useState("");
  const [line, setLine] = useState("");
  const [department, setDepartment] = useState("Cesar");
  const [plate, setPlate] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [photoIdentificationFront, setPhotoIdentificationFront] = useState("");
  const [photoIdentificationBack, setPhotoIdentificationBack] = useState("");
  const [photoDriverLicenseFront, setPhotoDriverLicenseFront] = useState("");
  const [photoDriverLicenseBack, setPhotoDriverLicenseBack] = useState("");
  const [photoPropertyCardFront, setPhotoPropertyCardFront] = useState("");
  const [photoPropertyCardBack, setPhotoPropertyCardBack] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const { nextSection } = useContext(RegisterContext);

  const eventSection = (section) => {
    if (section === 1) {
      if (identification.trim() === "") {
        setError({ identification: true });
        return;
      }
      if (name.trim() === "") {
        setError({ name: true });
        return;
      }
      if (city.trim() === "") {
        setError({ city: true });
        return;
      }
      if (department.trim() === "") {
        setError({ department: true });
        return;
      }
      if (gender.trim() === "") {
        setError({
          gender: true,
        });
        return;
      }
      if (photoIdentificationFront.trim() === "") {
        setError({
          photoIdentificationFront: true,
        });
        return;
      }
      if (photoIdentificationBack.trim() === "") {
        setError({
          photoIdentificationBack: true,
        });
        return;
      }
      if (photoDriverLicenseFront.trim() === "") {
        setError({
          photoDriverLicenseFront: true,
        });
        return;
      }
      if (photoDriverLicenseBack.trim() === "") {
        setError({
          photoDriverLicenseBack: true,
        });
        return;
      }

      setError({});

      nextSection(section, {
        identification,
        name,
        city,
        department,
        gender,
        photoIdentificationFront,
        photoIdentificationBack,
        photoDriverLicenseFront,
        photoDriverLicenseBack,
      });
      navigation.navigate("secondSectionRegister", {
        identification,
      });
    }

    if (section === 2) {
      if (numberPropertyCard.trim() === "") {
        setError({
          numberPropertyCard: true,
        });
        return;
      }
      if (typeVehicle.trim() === "") {
        setError({
          typeVehicle: true,
        });
        return;
      }
      if (plate.trim() === "") {
        setError({
          plate: true,
        });
        return;
      }
      if (brand.trim() === "") {
        setError({
          brand: true,
        });
        return;
      }
      if (model.trim() === "") {
        setError({
          model: true,
        });
        return;
      }
      if (color.trim() === "") {
        setError({
          color: true,
        });
        return;
      }
      if (cc.trim() === "") {
        setError({
          cc: true,
        });
        return;
      }
      if (line.trim() === "") {
        setError({
          line: true,
        });
        return;
      }
      if (photoPropertyCardFront.trim() === "") {
        setError({
          photoPropertyCardFront: true,
        });
        return;
      }
      if (photoPropertyCardBack.trim() === "") {
        setError({
          photoPropertyCardBack: true,
        });
        return;
      }

      setError({});

      nextSection(section, {
        numberPropertyCard,
        typeVehicle,
        brand,
        model,
        color,
        cc,
        plate,
        line,
        photoPropertyCardFront,
        photoPropertyCardBack,
      });
      navigation.navigate("thirdSectionRegister");
    }

    if (section === 3) {
      if (phone.trim() === "") {
        setError({
          phone: true,
        });
        return;
      }
      if (email.trim() === "") {
        setError({
          email: true,
        });
        return;
      }
      if (verifyEmail.trim() === "") {
        setError({
          verifyEmail: true,
          type: "required",
        });
        return;
      }
      if (verifyEmail !== email) {
        setError({
          verifyEmail: true,
          type: "notEqual",
        });
        return;
      }
      if (password.trim() === "") {
        setError({
          password: true,
        });
        return;
      }
      if (verifyPassword.trim() === "") {
        setError({
          verifyPassword: true,
          type: "required",
        });
        return;
      }
      if (verifyPassword !== password) {
        setError({
          verifyPassword: true,
          type: "notEqual",
        });
        return;
      }

      setError({});
      const res = nextSection(section, {
        phone,
        email,
        password,
      });

      if (res === false) {
        setMessage("Húbo un problema al crear al usuario, intente de nuevo");
        setIsOpen(true);
      } else if (res === true) {
        setMessage("Usuario creado con éxito");
        setIsOpen(true);
      }
    }
  };
  const handleDepartment = (value) => {
    setDepartment(value);
    setCity("");
  };

  return {
    handleDepartment,
    setIdentification,
    setName,
    setCity,
    setGender,
    setNumberPropertyCard,
    setDepartment,
    setPlate,
    setVerifyEmail,
    setVerifyPassword,
    department,
    setTypeVehicle,
    setBrand,
    setModel,
    setColor,
    setCc,
    setLine,
    setPhotoIdentificationFront,
    setPhotoIdentificationBack,
    setPhotoDriverLicenseFront,
    setPhotoDriverLicenseBack,
    setPhotoPropertyCardFront,
    setPhotoPropertyCardBack,
    photoDriverLicenseBack,
    photoDriverLicenseFront,
    photoIdentificationBack,
    photoIdentificationFront,
    photoPropertyCardBack,
    photoPropertyCardFront,
    isOpen,
    message,
    setIsOpen,
    setPhone,
    setEmail,
    setPassword,
    error,
    eventSection,
    identification,
  };
};

export default useRegisterForm;
