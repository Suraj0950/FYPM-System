import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddStudent from "../../components/modal/AddStudent";
import {
  createStudent,
  deleteStudent,
  getAllUsers,
  updateStudent
} from "../../store/slices/adminSlice";
import { Check, CheckCircle, Plus, TriangleAlert, Users } from "lucide-react"; 
import { toggleStudentModal } from '../../store/slices/popupSlice'


const ManageStudents = () => {
  const { users, projects } = useSelector((state) => state.admin);
  const { isCreateStudentModalOpen } = useSelector(state => state.popup);
  const [ showModal, setShowModal ] = useState( false);
  const [ editingStudent, setEditingStudent] = useState( null);
  const [ serchTerm, setSearchTerm ] = useState("");
  const [ filterDepartment, setFilterDepartment ] = useState("all");
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);
  const [ studentToDelete, setStudentToDelete ] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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
        projectStatus: studentProject?.status || null,
      }
    });
  },[users, projects]);



  const departments = useMemo(() => { 
    const set = new Set((students || []).map((s) => s.department).filter(Boolean));   
    return Array.from(set);
  }, [students]);

  const filterStudents = students.filter(student => {
    const matchesSearch =
      (student.name || "").toLowerCase().includes(serchTerm.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(serchTerm.toLowerCase());

    const matchesFilter =
      filterDepartment === "all" || student.department === filterDepartment;
    return matchesSearch && matchesFilter;
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormData({
      name: "",
      email: "",
      department: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingStudent) {
      dispatch(updateStudent({ id: editingStudent._id, data: formData }));
    } else {
      dispatch(createStudent(formData));
    }
    handleCloseModal();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      department: student.department,
    });
    setShowModal(true);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      dispatch(deleteStudent(studentToDelete._id));
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  const cancelDelete = () => { 
    if (studentToDelete) {
      dispatch(deleteStudent(studentToDelete._id));
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  return (
    <> 
      <div className="space-y-6">
        {/* Header */}
        <div className="card">
          <div className="card-header flex flex-col md:flex-row justify-between
           items-start md:items-center">
            <div>
              <h1 className="card-title text-blue-500"> Manage Students</h1>
              <p className="card-subtitle "> Add, edit and manage student account</p>
            </div>
            <button onClick={()=> dispatch(toggleStudentModal())}
              className="btn-primary flex items-center space-x-2 mt-4 md:mt-0 cursor-pointer">
              <Plus className=" w-5 h-5" />
              <spam> Add New Student </spam>
            </button>

           </div>
        </div> 
        {/* Stats and cards */}
        <div className="grid grid-cols md:grid-cols-3 gap-6">
          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg ">
                <Users className="w-6 h-6 text-blue-600"/>
              </div>
              <div className="ml-4">
                <p className="text-sm fonmt-medium text-slate-600">Total Students</p>
                <p className="text-lg font-semibold text-slate-800">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg ">
                <CheckCircle className="w-6 h-6 text-purple-600"/>
              </div>
              <div className="ml-4">
                <p className="text-sm fonmt-medium text-slate-600">Completed Projects</p>
                <p className="text-lg font-semibold text-slate-800">{students.filter(s => s.Status === "completed").length}
                  
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg ">
                <TriangleAlert className="w-6 h-6 text-amber-600"/>
              </div>
              <div className="ml-4">
                <p className="text-sm fonmt-medium text-slate-600">Unassigned</p>
                <p className="text-lg font-semibold text-slate-800">
                  {students.filter(s => !s.supervisor).length}     
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ManageStudents;