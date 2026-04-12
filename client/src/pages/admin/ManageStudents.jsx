import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddStudent from "../../components/modal/AddStudent";

const ManageStudents = () => {
  const { users, projects } = useSelector((state) => state.admin);
  const { isCreateStudentModalOpen } = useSelector(state.popup);
  const [ showModal, setShowModal ] = useState( false);
  const [ edingStudent, setEditingStudent] = useState( null);
  const [ serchTerm, setSearchTerm ] = useState("");
  const [ filterDepartment, setFilterDepartment ] = useState("all");
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const dispatch = useDispatch();

  const students = useMemo(() => {
    const studentsUsers = (users || []).filter(u => u.role?.toLowerCae() === "student");

    return studentsUsers.map((student) => {
      const studentProject = (projects || []).find(
        (p) => p.student?._id === student._id
      );
      return {
        ...student,
        projectTitle: studentProject?.title || null,
        supervisor: studentProject?.supervisor || null,
        // yhan ek chiz aur likhna hai
      };
    });

  },[users, projects]);

  return ({
    
  });
};

export default ManageStudents;