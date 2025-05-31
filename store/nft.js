import {defineStore} from 'pinia'
import {useCookie, useNuxtApp} from '#app'
import axios from "axios";

export const useNftStore = defineStore('nft', {
    state: () => ({
        nftInfo: {
            token_id: 0,
            vin: '',
            metadata_url: '',
            is_minted: false,
            created_at: '',
            token_data: {
                contract_addr: '',
                chain_id: 0,
                chain_name: '',
                token_id: 0,
                token_url: '',
                tx: '',
                records: []
            }
        },
        loading: false,
        error: false
    }),
    actions: {
        async fetchNftInfo(vin) {
            const {$axiosNft} = useNuxtApp();

            await $axiosNft.get(`nfts/${vin}`,
                {
                    Authorization: useCookie('token').value || null,
                    'Content-Type': 'application/json'
                })
                .then(response => {
                    console.log("data from api: ", response.data.data)

                    this.nftInfo = response.data.data
                    this.loading = true

                    return response.data.data
                })
                .catch(error => {
                    console.log(error.data)
                })
        },

        async mintNFT(vin) {
            const {$axiosNft} = useNuxtApp();

            this.loading = true;
            this.error = null;

            try {
                const response = await $axiosNft.post(`nfts/`, {vin: vin},
                    {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json'
                    })
                this.nftInfo = response.data.data;
            } catch (err) {
                console.error("Ошибка:", err);
                this.error = "Произошла ошибка при выпуске или загрузке токена.";
            } finally {
                this.loading = false;
            }
        },

        async addRecord(vin, description, company, signature) {
            try {
                const {$axiosNft} = useNuxtApp();

                this.loading = true;
                this.error = null;

                const response = await $axiosNft.post(`/nfts/${vin}/record`,
                    {
                        "vin": vin,
                        "description": description,
                        "company": company,
                        "signature": signature
                    },
                    {
                        Authorization: useCookie('token').value || null,
                        'Content-Type': 'application/json'
                    })

                this.nftInfo = response.data.data;
                console.log("response data: ", response.data.data.token_data.tx)
                return response.data.data.token_data.tx
            } catch (err) {
                console.error("Ошибка:", err);
                this.error = "Произошла ошибка при выпуске или загрузке токена.";
            } finally {
                this.loading = false;
            }
        }
    },
})
