import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({     //exportando
    providers:[AxiosAdapter],
    exports:[AxiosAdapter]
})
export class CommonModule {}
