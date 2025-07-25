import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token"); // or from Redux if stored there

        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ Include this if using JWT
          },
          withCredentials: true // ✅ Only if your backend uses cookies for auth
        });

        console.log("called");

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Error fetching companies:", error.response?.data || error.message);
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
