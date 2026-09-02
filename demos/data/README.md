# Demo data (TIFF + CSV)

Local TIFF/CSV slices remain under this directory. The landmarks and gut-study
notebooks load **seqFISH** via `squidpy.datasets.seqfish()` (Lohoff et al. mouse
gastrulation) and do not read these files.

## Layout

```
cells/
  morphology_rgb.tif       # (430, 540, 3) uint8 morphology (channels 1–3, p99.5 stretch)
  nucleus_labels_rgb.tif   # (430, 540, 3) uint8 colorized nucleus labels
  gene_totals.csv          # gene, count  (column sums from the cells table)
  transcripts.csv          # x, y, z, feature_name, cell_id
ileum/
  cells.csv                # x, y, cell_type, cell_class, anatomical_layer, mucosal_pseudospace
                           # (square-cropped SPF ileum slice, n=20185)
  expr.csv                 # 14-gene expression panel, same row order as cells.csv
recipes/
  *.svg                    # use-case gallery schematics
figure1_spatial_analogy.png
```

## Provenance

- **cells/** — derived from
  [10x Genomics Xenium Prime FFPE Human Cervical Cancer](https://www.10xgenomics.com/datasets/xenium-prime-ffpe-human-cervical-cancer)
  (CC BY 4.0).
- **ileum/** — derived from Xu et al., *Cell Host Microbe* (2026), SPF ileum
  cross-section `20211215_WT_ile1_slice_4` (pre-cropped).

To regenerate, run `demos/data/export_from_raw.py`.
