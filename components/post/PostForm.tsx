import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  _id: string;
  setIsSubmitted: () => void;
}

export interface IPostFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const PostForm = ({ _id, setIsSubmitted }: Props) => {
  const isValidEmail = (email: string) =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostFormInput>({
    defaultValues: {
      _id: _id,
    },
  });

  const onSubmit: SubmitHandler<IPostFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => setIsSubmitted())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-2xl p-5 mx-auto my-10 mb-10"
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold"></h4>
      <hr className="py-3 mt-2" />

      <label className="block mb-5">
        <span className="text-green-700">Name</span>
        <input
          {...register('name', {
            required: true,
          })}
          className="block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-yellow-500 focus:ring"
          placeholder="John Appleseed"
          type="text"
        />
      </label>
      <label className="block mb-5">
        <span className="text-green-700">Email</span>
        <input
          {...register('email', {
            required: true,
            validate: isValidEmail,
          })}
          className="block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-yellow-500 focus:ring"
          placeholder="John Appleseed"
          type="text"
        />
      </label>
      <label className="block mb-5">
        <span className="text-green-700">Comment</span>
        <textarea
          {...register('comment', {
            required: true,
          })}
          className="block w-full px-3 py-2 mt-1 rounded shadow outline-none boreder form-textarea ring-yellow-500 focus:ring"
          placeholder="John Appleseed"
          rows={8}
        />
      </label>

      {/* errors will return when field validation fails */}
      <div className="flex flex-col p-5">
        {errors.name && (
          <p className="text-red-500">- The Name Field is required</p>
        )}
        {errors.comment && (
          <p className="text-red-500">- The Email Field is required</p>
        )}
        {errors.email && (
          <p className="text-red-500">- The Comment Field is required</p>
        )}
      </div>

      <input
        className="px-4 py-2 font-bold text-white bg-yellow-500 rounded shadow cursor-pointer hover:bg-yellow-400"
        type="submit"
      />
    </form>
  );
};

export default PostForm;
