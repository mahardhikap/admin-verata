import React, { useEffect, useState } from "react";
import Dashboard from "@/containers/dashboard.container";
import { toast } from "react-toastify";
import withAuth from "@/utils/with-auth";
import Loading from "@/components/atomic/loading";
import { createUser, detailUser, updateUser, userList } from "@/api/user.api";
import { UserDetailI, UserLoginI } from "@/interfaces/user.interface";
import { truncateText } from "@/utils/truncate-text";

const Setting: React.FC = () => {
  const [userDetail, setUserDetail] = useState<UserDetailI>();
  const [userPassword, setUserPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [listAdmin, setListAdmin] = useState<UserDetailI[]>();
  const [newUser, setNewUser] = useState<UserLoginI>({
    username:'',
    password:''
  })

  const handleGetDetailUser = async () => {
    try {
      setLoading(true);
      const response = await detailUser();
      if (response?.code === 200) {
        setUserDetail(response?.data);
      } else {
        toast.warning(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const response = await updateUser(userDetail?.id as string, {
        password: userPassword,
      });
      if (response?.code === 200) {
        toast.success(response?.message);
        setUserPassword("");
      } else {
        toast.warning(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserList = async () => {
    try {
      setLoading(true);
      const response = await userList();
      if (response?.code === 200) {
        setListAdmin(response?.data);
      } else {
        toast.warning(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const response = await createUser(newUser);
      if (response?.code === 201) {
        toast.success(response?.message);
        setNewUser({username:'', password:''});
        await handleGetUserList()
      } else {
        toast.warning(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetailUser();
  }, []);

  useEffect(() => {
    if (userDetail?.roles === "superadmin") {
      handleGetUserList();
    }
  }, [userDetail?.roles]);

  return (
    <Dashboard>
      {loading ? (
        <Loading />
      ) : (
        <div className="py-2 px-3">
          <div className="grid grid-cols-2 gap-5">
            <div className="w-full">
              <div className="flex flex-col gap-5">
                <div className="w-full">
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    className="px-3 py-2 border-2 border-black cursor-not-allowed bg-gray-300 w-full"
                    value={userDetail?.username}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <p>Roles</p>
                  <input
                    type="text"
                    name="roles"
                    className="px-3 py-2 border-2 border-black cursor-not-allowed bg-gray-300 w-full"
                    value={userDetail?.roles}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <p>Set New Password</p>
                  <input
                    type="text"
                    name="password"
                    className="px-3 py-2 border-2 border-black w-full"
                    value={userPassword}
                    placeholder="Change password..."
                    onChange={(e) => setUserPassword(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="py-2 bg-[#919295] text-lg text-white font-semibold w-1/3"
                  onClick={handleUpdateUser}
                >
                  Update User
                </button>
              </div>
            </div>
            <div
              className={`w-full ${
                userDetail?.roles !== "superadmin" ? "hidden" : ""
              }`}
            >
              <div className="flex flex-col gap-5">
                <div className="w-full">
                  <p>Create Username</p>
                  <input
                    type="text"
                    name="username"
                    className="px-3 py-2 border-2 border-black w-full"
                    value={newUser?.username}
                    placeholder="Input username..."
                    onChange={(e) => setNewUser({...newUser, username:e.target.value})}
                    autoComplete="off"
                  />
                </div>
                <div className="w-full">
                  <p>Create Password</p>
                  <input
                    type="text"
                    name="password"
                    className="px-3 py-2 border-2 border-black w-full"
                    value={newUser?.password}
                    placeholder="Input password..."
                    onChange={(e) => setNewUser({...newUser, password:e.target.value})}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="py-2 bg-[#919295] text-lg text-white font-semibold w-1/3"
                  onClick={handleCreateUser}
                >
                  Create User
                </button>
              </div>
            </div>
          </div>
          <div
            className={`${
              userDetail?.roles !== "superadmin" ? "hidden" : ""
            } mt-10`}
          >
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left w-1/4">id</th>
                  <th className="py-3 px-6 text-left">username</th>
                  <th className="py-3 px-6 text-left">roles</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {listAdmin?.map((user, i) => {
                  return (
                    <tr
                      className="border-b border-gray-300 hover:bg-gray-100"
                      key={i}
                    >
                      <td className="py-3 px-6">{truncateText(user.id, 3)}</td>
                      <td className="py-3 px-6">{user.username}</td>
                      <td className="py-3 px-6">{user.roles}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default withAuth(Setting);
