
import apiClient from "../api/ClientApi"
import StudentApi from "../api/StudentApi"
import FormData from "form-data"

export type Student = {
    id: String,
    name: String,
    image: String,
}

const getAllStudents = async () => {
    //console.log("getAllStudents()")
    const res: any = await StudentApi.getAllStudents()
    let data = Array<Student>()
    if (res.data) {
        res.data.forEach((obj: any) => {
            //console.log("element: " + obj._id)
            const st: Student = {
                name: obj.name,
                id: obj._id,
                image: obj.avatarUrl
            }
            data.push(st)
        });
    }
    return data
}

const addStudent = async (student: Student) => {
    //console.log("~~~~~~~~addStudent~~~~~~")
    const data = {
        _id: student.id,
        name: student.name,
        avatarUrl: student.image
    }
    try {
        const res = StudentApi.addStudent(data)
    } catch (err) {
        console.log("add student fail: " + err)
    }
}

const uploadImage = async (imageURI: String) => {
    var body = new FormData();
    body.append('file', { name: "name", type: 'image/jpeg', uri: imageURI });
    try {
        const res = await StudentApi.uploadImage(body)
        if (!res.ok) {
            console.log("~~~~save failed " + res.problem)
        } else {
            if (res.data) {
                const d: any = res.data
                console.log("----= url:" + d.url)
                return d.url
            }
        }
    } catch (err) {
        console.log("save failed " + err)
    }
    return ""
}
export default { getAllStudents, addStudent, uploadImage }