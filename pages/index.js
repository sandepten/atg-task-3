import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ users }) {
  const [userView, setUserView] = useState("Username");
  const [sideView, setSideView] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUser = { ...userView };
  useEffect(() => {
    setLoading(false);
  }, [users]);

  return (
    <div className="">
      <Head>
        <title>ATG-task-3</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-around my-8 mx-20 space-x-16">
        <section className="text-center w-1/2">
          <p className="text-4xl font-bold py-4 bg-blue-400 rounded-lg mb-5">
            USERS
          </p>
          {users ? (
            !loading ? (
              <div>
                {users?.map((user) => (
                  <div className="" key={user.id}>
                    <button
                      onClick={() => {
                        setUserView(user);
                        setSideView(true);
                      }}
                      className="py-2 w-full hover:underline rounded-lg flex items-center hover:bg-blue-300 bg-blue-200 border text-lg font-medium mb-2"
                    >
                      {/* <img src={user.avatar} alt="" /> */}
                      <img
                        src="/profile.png"
                        width="50"
                        className="mx-5"
                        alt=""
                      />
                      <span className="mr-2">{user.profile.firstName}</span>
                      <span>{user.profile.lastName}</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div role="status" className="absolute top-1/3 right-1/2">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-16 h-16 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )
          ) : (
            <div className="text-4xl font-medium mt-8 absolute top-1/3 right-0 left-0">
              Sorry, No data available!
            </div>
          )}
        </section>
        <section className="text-center w-1/2 bg-blue-50 rounded-lg">
          <div className="text-4xl font-semibold py-4 bg-blue-400 rounded-lg">
            <span className="mr-3">
              {currentUser?.profile?.firstName || "User"}
            </span>
            <span>{currentUser?.profile?.lastName}</span>
          </div>
          {sideView ? (
            <div>
              <div className="text-center flex justify-center mt-4">
                <img
                  // src={currentUser?.avatar || "/profile.png"}
                  src="/profile.png"
                  width="150"
                  className="my-5"
                  alt=""
                />
              </div>
              <div className="font-semibold text-xl">
                <span>@</span>
                <span>{currentUser?.profile?.username}</span>
              </div>
              <div className="text-left mx-40 mt-12">
                <p className="text-xl font-medium my-1.5">Bio</p>
                <textarea
                  disabled
                  rows="4"
                  value={currentUser?.Bio}
                  className="bg-blue-200 font-medium py-2 mb-6 border w-full rounded-lg px-2 resize-none"
                ></textarea>
                <p className="text-lg font-medium my-1.5">Full Name</p>
                <div className="bg-blue-200 font-medium py-2 border w-full rounded-lg mb-5">
                  <span className="mx-2 ">
                    {currentUser?.profile?.firstName}
                  </span>
                  <span>{currentUser?.profile?.lastName}</span>
                </div>
                <p className="text-lg font-medium my-1.5">Job Title</p>
                <p className="bg-blue-200 font-medium py-2 border w-full rounded-lg px-2 mb-5">
                  {currentUser?.jobTitle}
                </p>
                <p className="text-lg font-medium my-1.5">Email</p>
                <p className="bg-blue-200 font-medium py-2 border w-full rounded-lg px-2 mb-2">
                  {currentUser?.profile?.email}
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://602e7c2c4410730017c50b9d.mockapi.io/users");
  try {
    const data = await res.json();
    return {
      props: { users: data },
    };
  } catch (error) {
    return {
      props: { users: false },
    };
  }
};
