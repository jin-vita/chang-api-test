<script>

import axios from "axios";

export default {
  name: "TokenView",
  data() {
    return {
      token: 'waiting...',
      result: 'waiting...',
      clientId: '65d23e80-823c-41fb-8639-a9ca009dcf88',
      clientSecret: 'PJFDUrluflziOQg8kHAPNgMdoHT8USwGO9p0emZK/Bg=',
      bizNoList: '8778100563,6428700732,1010120290',
      resultData: [],
    };
  },
  methods: {
    async sendPost() {
      this.token = 'waiting...';
      this.result = 'waiting...';
      this.resultData = [];
      let url = 'https://cors-anywhere.herokuapp.com/https://api.moneypin.biz/bizno/v1/auth/token';
      let data = {
        grantType: 'ClientCredentials',
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      };

      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };

      try {
        let response = await axios.post(url, data, config);
        console.log(response.data.token);
        this.token = response.data.token;
        await this.getInfo();
      } catch (error) {
        console.error(error);
        this.token = `토큰 생성 실패 -> ${error}`;
      }
    },
    async getInfo() {
      let url = 'https://cors-anywhere.herokuapp.com/https://api.moneypin.biz/bizno/v1/biz/info/all';
      let data = {
        bizNoList: this.bizNoList.replaceAll(' ', '').split(','),
      };

      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
      };

      try {
        let response = await axios.post(url, data, config);
        console.log(response.data[0].info);
        this.resultData = response.data
        this.result = `총 ${response.data.length}개 조회 완료`
      } catch (error) {
        console.error(error);
        this.result = `정보 조회 실패 -> ${error}`;
      }
    },
  },
}
</script>

<template>
  <div>정보 입력</div>
  <v-text-field v-model="clientId" label="ClientId" variant="underlined" />
  <v-text-field v-model="clientSecret" label="ClientSecret"
                variant="underlined" />
  <v-text-field v-model="bizNoList" label="bizNoList" variant="underlined" />
  <v-btn @click="sendPost">정보 조회</v-btn>
  <br>
  <br>
  <p>1. 생성된 토큰</p>
  <p>{{ token }}</p>
  <br>
  <p>2. 조회된 정보</p>
  <p>{{ result }}</p>

  <v-table style="max-width: 1280px; margin: auto">
    <thead>
    <tr>
      <th class="text-center">index</th>
      <!--      <th class="text-center">bizNo</th>-->
      <th class="text-center">bizName</th>
      <th class="text-center">ceoName</th>
      <!--      <th class="text-center">zipCode</th>-->
      <th class="text-center">address</th>
      <th class="text-center">bizType</th>
      <th class="text-center">bizStatus</th>
      <th class="text-center">taxType</th>
      <!--      <th class="text-center">openingDate</th>-->
      <th class="text-center">bizSectorName</th>
      <th class="text-center">bizCategoryName</th>
      <!--      <th class="text-center">bizCategoryCode</th>-->
      <!--      <th class="text-center">corpRegNo</th>-->
      <!--      <th class="text-center">phoneNumber</th>-->
      <th class="text-center">taxOfficeCode</th>
      <!--      <th class="text-center">taxOfficeName</th>-->
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in this.resultData">
      <td>{{ index + 1 }}</td>
      <!--      <td>{{ item.info.bizNo }}</td>-->
      <td>{{ item.info.bizName }}</td>
      <td>{{ item.info.ceoName }}</td>
      <!--      <td>{{ item.info.zipCode }}</td>-->
      <td>{{ item.info.address }}</td>
      <td>{{ item.info.bizType }}</td>
      <td>{{ item.info.bizStatus }}</td>
      <td>{{ item.info.taxType }}</td>
      <!--      <td>{{ item.info.openingDate }}</td>-->
      <td>{{ item.info.bizSectorName }}</td>
      <td>{{ item.info.bizCategoryName }}</td>
      <!--      <td>{{ item.info.bizCategoryCode }}</td>-->
      <!--      <td>{{ item.info.corpRegNo }}</td>-->
      <!--      <td>{{ item.info.phoneNumber }}</td>-->
      <td>{{ item.info.taxOfficeCode }}</td>
      <!--      <td>{{ item.info.taxOfficeName }}</td>-->
    </tr>
    </tbody>
  </v-table>

  <br>
  <p>JSON DATA</p>
  <p>{{ resultData }}</p>

</template>

<style scoped>

</style>