import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import Logo from "../logo.svg";
import { toast } from "react-toastify";

const Form = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const api = process.env.REACT_APP_API_NODE;

  const types = [
    { value: "Rent", label: "Rent" },
    { value: "Buy", label: "Buy" },
    { value: "Exchange", label: "Exchange" },
    { value: "Donation", label: "Donation" },
  ];

  const loadAreas = async (inputValue) => {
    if (inputValue.length >= 3) {
      try {
        const response = await axios.get(`${api}/areas`, {
          params: { input: inputValue },
        });

        const options = response.data.map((place) => ({
          value: place.placeId,
          label: `${place.mainText} / ${place.secondaryText}`,
        }));

        return options;
      } catch (error) {
        console.error("Error fetching autocomplete data:", error);
        return [];
      }
    } else {
      return [];
    }
  };

  const handleAriaSelectChange = (selectedArea) => {
    setValue("area", selectedArea ? selectedArea.value : "");
  };

  const onSubmit = async (data) => {
    if (!isValid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    const property = {
      ...data,
      type: data?.type?.value,
      area: data?.area?.value,
    };
    const missingValue = Object.keys(property).find(
      (prop) => !property[prop] || property[prop] === "",
    );
    if (missingValue) {
      toast.error(`Please fill in the "${missingValue}"`);
      return;
    }
    try {
      const response = await axios.post(`${api}/properties`, {
        property: property,
      });
      if (response.status === 200) {
        reset({
          title: "",
          type: null,
          area: null,
          price: "",
          description: "",
        });
        toast.success("Property submitted successfully!");
      } else {
        toast.error(`Failed to submit property. Status: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Failed to submit property.`);
    }
  };

  return (
    <div className="container w-full max-w-lg px-7 mt-3">
      <img src={Logo} alt="Logo" className="h-12" />
      <h1 className="text-3xl font-bold my-4">New property classified</h1>
      <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="font-bold my-2" htmlFor="title">
          Title
        </div>
        <input
          type="text"
          id="title"
          {...register("title", { required: true, maxLength: 155 })}
          className="w-full bg-white border border-gray-300 rounded-md p-1.5"
        />
        {errors.title && (
          <span className="text-red-500">
            {errors.title.type === "required" && "Title is required"}
            {errors.title.type === "maxLength" &&
              "Title must be up to 155 characters"}
          </span>
        )}
        <div className="font-bold my-2" htmlFor="type">
          Type
        </div>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              options={types}
              placeholder="Select type"
              styles={{
                option: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                }),
              }}
            />
          )}
        />
        {errors.type && <span className="text-red-500">Type is required</span>}
        <div className="font-bold my-2" htmlFor="type">
          Area
        </div>
        <Controller
          name="area"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              loadOptions={loadAreas}
              onChange={(selectedOption) => {
                handleAriaSelectChange(selectedOption);
                field.onChange(selectedOption);
              }}
              placeholder="Type in the property's area"
              styles={{
                option: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                }),
              }}
            />
          )}
        />
        {errors.area && <span className="text-red-500">Area is required</span>}
        <div className="font-bold my-2" htmlFor="price">
          Price (in euros)
        </div>
        <input
          type="number"
          id="price"
          {...register("price", { required: true })}
          className="w-full bg-white border border-gray-300 rounded-md p-1.5"
        />
        {errors.price && (
          <span className="text-red-500">Price is required</span>
        )}
        <div className="font-bold my-2" htmlFor="description">
          Extra description
        </div>
        <textarea
          id="description"
          {...register("description")}
          className="w-full bg-white border border-gray-300 rounded-md p-1.5"
        />
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
