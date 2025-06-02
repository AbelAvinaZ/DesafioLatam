import { Link } from "react-router-dom";

const Form = ({ fields, onSubmit, buttonText, linkTo, linkText, onChange }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md"
    >
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-700">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {buttonText}
      </button>
      {linkTo && linkText && (
        <Link to={linkTo} className="block text-center mt-2 text-blue-500">
          {linkText}
        </Link>
      )}
    </form>
  );
};

export default Form;
