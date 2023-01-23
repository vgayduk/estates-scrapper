import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { RealtorService } from 'src/services/realtor.service';
import type { Response } from 'express';

@Controller('parse')
export class ParserController {
  constructor(private readonly realtorService: RealtorService) {}

  @Get()
  async parse(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const data = await this.realtorService.parse();
    const fileData = this.realtorService.saveDataToFile(data);

    res.set({
      'Content-Type': `application/${fileData.fileType}`,
      'Content-Disposition': `attachment; filename="${fileData.fileName}"`,
    });

    return new StreamableFile(fileData.file);
  }
}
