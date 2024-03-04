<script>

import axios from "axios";

export default {
  name: "TokenView",
  data() {
    return {
      token: 'waiting...',
      result: 'waiting...',
      clientId: 'e066eed4-d817-4109-8832-0c253a42671d',
      clientSecret: 'zJwx4xb0r1lt0H617/0Zd9O5Z/YSfXXKaWyu7ybHf84=',
      bizNoList: '6428700732',
    };
  },
  methods: {
    async sendPost() {
      this.token = 'waiting...';
      this.result = 'waiting...';
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
        await this.getInfo(this.token, '6428700732');
      } catch (error) {
        console.error(error);
        this.token = `토큰 생성 실패 -> ${error}`;
      }
    },
    async getInfo(token, no) {
      let url = 'https://cors-anywhere.herokuapp.com/https://api.moneypin.biz/bizno/v1/biz/info/base';
      let data = {
        bizNoList: [
          no,
        ]
      };

      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      try {
        let response = await axios.post(url, data, config);
        console.log(response.data[0].info);
        const info = response.data[0].info
        this.result = JSON.stringify(info);
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
</template>

<style scoped>

</style>