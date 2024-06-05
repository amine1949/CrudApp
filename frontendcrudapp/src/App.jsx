import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function App() {
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [etudiants, setNewEtudiant] = useState([]);
  const [formEtudiant, setFormEtdiant] = useState({
    id: null,
    full_name: "",
    age: "",
    email: ""
  });

  useEffect(() => {
    getEtudiants();
  }, []);

  function getEtudiants() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/etudiants",
    }).then((response) => {
      const data = response.data;
      setNewEtudiant(data);
    }).catch((error) => {
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    });
  }

  function createEtudiant(event) {
    axios({
      method: 'POST',
      url: "http://127.0.0.1:8000/api/etudiants/store",
      data: {
        full_name: formEtudiant.full_name,
        age: formEtudiant.age,
        email: formEtudiant.email
      }
    }).then((response) => {
      getEtudiants();
    });

    setFormEtdiant({
      full_name: "",
      age: "",
      email: ""
    });
    setExpanded(false);
    event.preventDefault();
    setOpen(false);
  }

  function updateEtudiant(event) {
    axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api/etudiants/update/${formEtudiant.id}`,
      data: {
        full_name: formEtudiant.full_name,
        age: formEtudiant.age,
        email: formEtudiant.email
      }
    }).then((response) => {
      getEtudiants();
    });

    setFormEtdiant({
      id: null,
      full_name: "",
      age: "",
      email: ""
    });
    setEditDialogOpen(false);
    event.preventDefault();
  }

  function deleteEtudiant(id) {
    axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/api/etudiants/delete/${id}`
    }).then(response => {
      getEtudiants();
    });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setFormEtdiant(prevEtudiant => ({
      ...prevEtudiant, [name]: value
    }));
  }

  function openEditDialog(etudiant) {
    setFormEtdiant(etudiant);
    setEditDialogOpen(true);
  }

  return (
    <>
      <div className='flex justify-center items-center my-10'>
        <section className='w-[70%]'>
          <h1 className=' text-[40px] text-center mb-10 font-bold'>Etudiants :</h1>
          <Table className=''>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="w-[100px]">Id</TableHead> */}
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {etudiants && etudiants.map((etudiant) => (
                <TableRow key={etudiant.id} >
                  {/* <TableCell className="font-medium">{etudiant.id}</TableCell> */}
                  <TableCell>{etudiant.full_name}</TableCell>
                  <TableCell>{etudiant.email}</TableCell>
                  <TableCell className="text-right">{etudiant.age}</TableCell>
                  <TableCell className="text-right">
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className='mr-10' onClick={() => openEditDialog(etudiant)}>Update</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Etudiant</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={updateEtudiant}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="full_name" className="text-right">
                                Full Name
                              </Label>
                              <Input
                                id="full_name"
                                name="full_name"
                                value={formEtudiant.full_name}
                                onChange={handleChange}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="age" className="text-right">
                                Age
                              </Label>
                              <Input
                                id="age"
                                name="age"
                                type='number'
                                value={formEtudiant.age}
                                onChange={handleChange}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                Email
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type='email'
                                value={formEtudiant.email}
                                onChange={handleChange}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button onClick={() => deleteEtudiant(etudiant.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className='text-center'>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className='mx-10 w-[40%]'>Add</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Etudiant</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={createEtudiant}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="full_name" className="text-right">
                              Full Name
                            </Label>
                            <Input
                              id="full_name"
                              name="full_name"
                              onChange={handleChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="age" className="text-right">
                              Age
                            </Label>
                            <Input
                              id="age"
                              name="age"
                              type="number"
                              onChange={handleChange}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              onChange={handleChange}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add New Etudiant</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </div>
    </>
  );
}

export default App;
