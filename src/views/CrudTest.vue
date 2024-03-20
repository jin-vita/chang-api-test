<template>
  <h2>CRUD TEST</h2>
  <div>{{ resultText }}</div>
  <v-row justify="center" align="center">
    <v-col cols="3">
      <v-text-field label="이름" v-model="name" variant="underlined" />
    </v-col>
    <v-col cols="auto">
      <v-btn @click="addData">등록</v-btn>
    </v-col>
  </v-row>
  <br>
  <div>등록 현황</div>
  <p v-if="loading">loading...</p>
  <v-table v-else style="max-width: 600px; margin: auto">
    <thead>
    <tr>
      <th class="text-center">생성시각</th>
      <th class="text-center">이름</th>
      <th class="text-center">삭제</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in this.documents" :key="item.id">
      <td>{{ setDate(item.createDate) }}</td>
      <td>{{ item.name }}</td>
      <td>
        <v-btn @click="deleteData(item.id)">❌</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script>
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import {db} from "../firebase.js";

export default {
  name: "CrudTest",
  data() {
    return {
      loading: false,
      documents: [],
      name: '',
      resultText: '등록하세요',
    }
  },
  methods: {
    setDate(timestamp) {
      if (!(timestamp instanceof Timestamp)) return ''
      return timestamp.toDate().toLocaleString();
    },
    async addData() {
      try {
        const docRef = await addDoc(collection(db, 'chang-crud-test'), {
          name: this.name.replaceAll(' ', ''),
          createDate: serverTimestamp()
        });
        // console.log(ADD_RANK, docRef);
        this.resultText = `${this.name} 등록 완료`;
        this.name = '';
        await this.getData();
      } catch (error) {
        console.log(error);
      } finally {
      }

    },
    async getData() {
      this.loading = true;
      try {
        const q = query(collection(db, 'chang-crud-test'), orderBy('createDate', 'desc'));

        const querySnapshot = await getDocs(q);
        const fetchedDocuments = [];

        querySnapshot.forEach((doc) => {
          // console.log(doc.id, doc.data());
          fetchedDocuments.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.documents = fetchedDocuments;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteData(docId) {
      this.loading = true;
      try {
        const docRef = doc(db, 'crud-test', docId);
        await deleteDoc(docRef);
        await this.getData();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  beforeMount() {
    this.getData();
  }
}
</script>

<style scoped>

</style>